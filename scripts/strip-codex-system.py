#!/usr/bin/env python3
"""Remove the Codex system prompt and tool lists from redacted Codex session files.

Run this after scripts/redact-transcript.sh, on its output folder:

    python3 -I scripts/strip-codex-system.py ai/transcripts/bolt-01

What it removes (replaced by a "<REMOVED: ...>" marker, the record itself stays):
- session_meta: base_instructions, dynamic_tools, creator_account_id, creator_user_id
- additional_tools records: the tool list (connected apps and plugins)
- developer messages written by Codex itself (system, permission, app, skill and
  multi-agent instructions). Developer messages that are this project's agent
  instructions from .codex/agents/*.toml are kept.
- world_state: the state (environments, tools, apps, plugins, model catalog)
- collaboration_mode in turn_context and thread_settings_applied
- app pages that the Codex desktop app attaches to user messages
- tool output that lists the connected apps

Conversation, tool calls, tool output and the project's own agent instructions stay.
The files are changed in place. The script prints counts only, never content.
"""

import json
import pathlib
import sys
import tomllib
from collections import Counter

REMOVED = "<REMOVED: Codex system content>"


def project_instructions(repo: pathlib.Path) -> list[str]:
    starts = []
    for toml in sorted((repo / ".codex" / "agents").glob("*.toml")):
        data = tomllib.loads(toml.read_text(encoding="utf-8"))
        text = data.get("developer_instructions", "").strip()
        if text:
            starts.append(" ".join(text.split())[:60])
    return starts


def is_project_text(text: str, starts: list[str]) -> bool:
    flat = " ".join(text.split())
    return any(flat.startswith(s) for s in starts)


def strip_record(rec: dict, starts: list[str], count: Counter) -> None:
    rtype = rec.get("type")
    payload = rec.get("payload")
    if not isinstance(payload, dict):
        return
    ptype = payload.get("type")

    if rtype == "session_meta":
        for key in ("base_instructions", "dynamic_tools", "creator_account_id", "creator_user_id"):
            if key in payload:
                payload[key] = REMOVED
                count["session_meta." + key] += 1

    elif rtype == "world_state" and "state" in payload:
        payload["state"] = REMOVED
        count["world_state.state"] += 1

    elif rtype == "turn_context" and "collaboration_mode" in payload:
        payload["collaboration_mode"] = REMOVED
        count["turn_context.collaboration_mode"] += 1

    elif rtype == "response_item" and ptype == "additional_tools":
        payload["tools"] = REMOVED
        count["additional_tools.tools"] += 1

    elif rtype == "response_item" and ptype == "message" and payload.get("role") == "developer":
        for part in payload.get("content", []):
            if isinstance(part, dict) and isinstance(part.get("text"), str):
                if is_project_text(part["text"], starts):
                    count["developer.kept_project_instructions"] += 1
                else:
                    part["text"] = REMOVED
                    count["developer.removed"] += 1

    elif rtype == "response_item" and ptype == "message" and payload.get("role") == "user":
        # Pages the Codex desktop app attaches on its own; the user did not type them.
        for part in payload.get("content", []):
            if isinstance(part, dict) and isinstance(part.get("text"), str):
                if part["text"].lstrip().startswith("<external_codex_apps"):
                    part["text"] = REMOVED
                    count["user.removed_app_page"] += 1

    elif rtype == "response_item" and ptype in ("custom_tool_call_output", "function_call_output"):
        # Tool output that lists the connected apps.
        if "mcp__codex_apps__" in json.dumps(payload, ensure_ascii=False):
            payload["output"] = REMOVED
            count["tool_output.removed_app_list"] += 1

    elif rtype == "event_msg" and ptype == "thread_settings_applied":
        settings = payload.get("thread_settings")
        if isinstance(settings, dict) and "collaboration_mode" in settings:
            settings["collaboration_mode"] = REMOVED
            count["thread_settings.collaboration_mode"] += 1


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 1
    folder = pathlib.Path(sys.argv[1])
    if "raw" in folder.parts:
        print("Run this on the redacted output, not on ai/transcripts/raw/.", file=sys.stderr)
        return 1
    repo = pathlib.Path(__file__).resolve().parent.parent
    starts = project_instructions(repo)
    count = Counter()
    for path in sorted(folder.rglob("*.jsonl")):
        out = []
        for line in path.read_text(encoding="utf-8").splitlines():
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                count["unparsed_lines_kept"] += 1
                out.append(line)
                continue
            strip_record(rec, starts, count)
            out.append(json.dumps(rec, ensure_ascii=False, separators=(",", ":")))
        path.write_text("\n".join(out) + "\n", encoding="utf-8")
        count["files"] += 1
    for key, value in sorted(count.items()):
        print(f"  {key:40s} {value}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
