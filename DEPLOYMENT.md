# Deployment

Public site: https://ogs.stephenjoly.net
Repository: https://github.com/stephenjoly/grip-reference

Dokploy owns builds and deployments. GitHub Actions validates JavaScript and the static container; it does not deploy. No runtime credentials or application environment variables are needed.

## Release

1. Open feature PRs against `staging`; pass the Validate check.
2. Dokploy builds `staging` with the root Dockerfile and context `.`. Verify the combined release on the staging service before promotion.
3. Promote with a `staging` → `main` release PR after owner authorization. Dokploy builds `main` and updates production.
4. Verify the deployed commit, container health, public HTTPS, exact-age lookup, clipboard formats, and accent Settings. A successful CI run alone does not establish deployment success.

Both services use the existing GitHub provider and retained GHCR images for rollback. Disable untrusted pull-request previews. Production routes `ogs.stephenjoly.net` to container port 8080 over the existing edge proxy. Staging uses an internal host rule; it does not need a public DNS record.

## Container

The pinned unprivileged Nginx image serves only the app and its bundled Geist font on port 8080. `/healthz` returns `ok`. Development files, source-control metadata, PDFs, and design artifacts are excluded from the image. Unknown paths return 404. Assets revalidate on each visit to avoid a stale clinical reference after an update.

To build locally:

```sh
docker build -t grip-reference .
docker run --rm -p 8080:8080 grip-reference
```

## Rollback

For a regression, revert through the same staging → main release path and let Dokploy rebuild. For urgent recovery, select the preceding retained image in Dokploy and verify its commit and health. For the first release, withdrawing only this application's route/service returns to the previous state. Do not change shared proxy, registry, or other applications.
