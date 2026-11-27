# VPS deployment

Templates target an Ubuntu/Debian VPS with systemd, Nginx, and Node.js 22 installed at `/usr/bin/node`. Confirm the server, available port 3100, existing virtual hosts, DNS provider and repository access before installation. Do not overwrite another website's configuration.

1. Create a dedicated `branogreen` system user and `/var/www/branogreen` owned by it.
2. Clone this private repository into that directory using a read-only deploy key. Keep credentials out of Git.
3. As the application user, run `npm ci` and `npm run build` in the checkout.
4. Copy `.env.example` to `/etc/branogreen.env`, configure Resend and a verified sender, set owner `root:branogreen` and permissions `640`. The current quote handler requires Resend for actual email delivery; without it the original V3 handler redirects to thank-you but sends nothing. Do not launch the enquiry form without configuring and testing delivery.
5. Install `branogreen.service` in `/etc/systemd/system/`; run `sudo systemctl daemon-reload` and `sudo systemctl enable --now branogreen`.
6. Verify `curl -f http://127.0.0.1:3100/`. Inspect errors with `sudo journalctl -u branogreen -n 100`.
7. Install `nginx.conf` as a separate enabled virtual host. Run `sudo nginx -t` before reloading Nginx. Test with `curl -H 'Host: branogreen.com' http://127.0.0.1/`.
8. Record existing DNS records for rollback. Point the apex and www to the confirmed VPS, checking both A and AAAA records. Preserve mail/MX records. Provision HTTPS with Certbot for both names after DNS resolves. The supplied Nginx template is HTTP-only until certificates are provisioned.
9. Verify HTTPS, assets, product pages, sitemap, and a real quotation email before declaring deployment complete.

## Updates and rollback

Record `git rev-parse HEAD` before updates. Fetch and check out the reviewed commit, run `npm ci && npm run build`, then restart `branogreen`. For rollback, check out the previous recorded commit, reinstall/build and restart. This simple in-place method has a maintenance window; use separate release directories for zero-downtime updates.

No deployment is triggered automatically by pushing this repository.
