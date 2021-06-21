export const sshTunnelConfig = {
  username: Cypress.env('DEV_DB_MONGO_SSH_USERNAME'),
  privateKey: Cypress.env('DEV_DB_MONGO_SSH_PEMFILE'),
  host: Cypress.env('DEV_DB_MONGO_SSH_HOST'),
  port: 22,
  dstHost: 'localhost',
  dstPort: 27017,
  localHost: '127.0.0.1',
  localPort: 50001
}
