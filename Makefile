.PHONY: test secret-scan pre-commit pre-push verify hooks-install
test:
	node scripts/verify.mjs
secret-scan:
	node scripts/scan-secrets.mjs
pre-commit: secret-scan
pre-push: test secret-scan
verify: pre-push
	npm pack --ignore-scripts --dry-run
hooks-install:
	bash hooks/sync-hooks.sh
