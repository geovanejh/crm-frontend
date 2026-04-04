export const LoginPage = () => {
  return (
    <div className="flex flex-1 w-full items-center justify-center">

      <div className="flex justify-center w-full">
        <h1>Welcome</h1>
      </div>
      <div className="flex justify-center w-full h-full">
        <form className="flex flex-col justify-center">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
