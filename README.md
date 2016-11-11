#auth_container

NPM install, etc. 

Can change the auth server in DEV_CONFIG.json

Put restricted content as children of <AuthContainer>. Example:

<AuthContainer redirect="/topsecret">
  <div>
    TOP SECRET INFORMATION
  </div>
</AuthContainer>

If user is not logged in, it will show them a login form. If successful, they are redirected to the url passed to <AuthContainer>

also contains user management GUI