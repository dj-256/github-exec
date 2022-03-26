# github-exec

A GitHub action that allows you to execute commands on your server after deployment for example

## Examples

### **Reload nginx**

```yml
- name: Reload nginx
  uses: dj-256/github-deploy@v1
  with:
    host: ${{ secrets.HOST }}
    port: ${{ secrets.PORT }}
    username: ${{ secrets.USERNAME }}
    password: ${{ secrets.PASSWORD }}
    command: sudo service reload ngnix

```

### **Install requirements and restart**

```yml
- name: Copy entire directory
  uses: dj-256/github-deploy@v1
  with:
    host: ${{ secrets.HOST }}
    port: ${{ secrets.PORT }}
    username: ${{ secrets.SSH_USER }}
    password: ${{ secrets.PASSWORD }}
    command: |
      npm install -C /home/user/myapp
      pm2 restart myapp
      pm2 info myapp

```

## Options

- **host** - _string_ - Hostname or IP address of the server. **required**

- **port** - _integer_ - Port number of the server. **Default:** `22`

- **username** - _string_ - Username for authentication. **required**

- **password** - _string_ - Password for password-based user authentication. **required**

- **command** - _string_ - The command(s) to execute on the host **required**

## Development

This uses [ssh2](https://github.com/mscdex/ssh2).
