#auth_container

NPM install, etc. 

Can change the auth server in DEV_CONFIG.json

Put restricted content as children of `<AuthContainer>`. Example:

`<AuthContainer redirect="/topsecret">`

  `<div>`

    TOP SECRET INFORMATION

  `</div>`
  
`</AuthContainer>`

If user is not logged in, it will show them a login form. If successful, they are redirected to the url passed to <AuthContainer>

also contains user management GUI

To move to a different project, you need:

To npm install: jquery, flux, keymirror, d3@^3.5.6

DEV_CONFIG.json in root of project. Set host to location of auth server

src/components/constants

src/components/utils

src/routes/AuthContainer

For admin portions, you also need:

src/routes/admin

Admin components are already wrapped in an AuthContainer