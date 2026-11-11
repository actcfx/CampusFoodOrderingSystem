// FR-01, FR-02, FR-03, FR-12, FR-18, FR-21, FR-31, FR-32, NFR-01
// UML: UC_Browse, UC_Register, UC_Login, UC_Cart, web application boundary;
// Student UI in sequence-order, Merchant Back Office in sequence-catalog and Administration System in sequence-admin.
import type { ReactNode } from 'react';

function StudentSignIn() {
  return (
    <main>
      <h1>學生登入</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>學號 <input name="studentNumber" autoComplete="username" /></label>
        <label>密碼 <input name="password" type="password" autoComplete="current-password" /></label>
        <button type="button" disabled>登入</button>
      </form>
      <p><a href="/student/register">註冊學生帳號</a></p>
    </main>
  );
}

function StudentRegistration() {
  return (
    <main>
      <h1>註冊學生帳號</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>學號 <input name="studentNumber" autoComplete="username" /></label>
        <label>暱稱 <input name="nickname" autoComplete="nickname" /></label>
        <label>密碼 <input name="password" type="password" autoComplete="new-password" /></label>
        <button type="button" disabled>註冊</button>
      </form>
      <p><a href="/student/sign-in">學生登入</a></p>
    </main>
  );
}

function MerchantSignIn() {
  return (
    <main>
      <h1>商家後台登入</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>帳號 <input name="account" autoComplete="username" /></label>
        <label>密碼 <input name="password" type="password" autoComplete="current-password" /></label>
        <button type="button" disabled>登入</button>
      </form>
    </main>
  );
}

function AdministratorSignIn() {
  return <main><h1>後台管理系統登入</h1></main>;
}

function OrderingFront() {
  return (
    <main>
      <h1>校園點餐系統</h1>
      <nav aria-label="登入">
        <ul>
          <li><a href="/student/sign-in">學生登入</a></li>
          <li><a href="/merchant/sign-in">商家後台登入</a></li>
          <li><a href="/administration/sign-in">後台管理系統登入</a></li>
        </ul>
      </nav>
      <section aria-labelledby="merchants">
        <h2 id="merchants">商家</h2>
        <p>暫無餐點</p>
      </section>
      <section aria-labelledby="cart">
        <h2 id="cart">購物車</h2>
        <p>整筆總額 NT$0</p>
      </section>
    </main>
  );
}

const screens = new Map<string, ReactNode>([
  ['/', <OrderingFront />],
  ['/student/sign-in', <StudentSignIn />],
  ['/student/register', <StudentRegistration />],
  ['/merchant/sign-in', <MerchantSignIn />],
  ['/administration/sign-in', <AdministratorSignIn />],
]);

export function App() {
  return screens.get(window.location.pathname) ?? <main><a href="/">返回點餐前台</a></main>;
}
