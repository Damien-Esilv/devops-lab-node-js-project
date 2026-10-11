# DevOps Lab Report

## 1. Project and feature

- **Project:** DevOps Lab Student Project
- **Repository:** `devops-lab-node-js-project`
- **Jira issue:** `DEVOPS-5`
- **Feature branch:** `feature/DEVOPS-5-version-endpoint`
- **Feature:** Implement and validate the `GET /version` endpoint
- **Report language:** English

The endpoint returns the application version read from the repository's
`package.json` file:

```json
{
  "version": "1.0.0"
}
```

## 2. Starting point

The work continued from the existing commit:

```text
f165577 feat(DEVOPS-5): implement version endpoint
```

The working tree was clean before the final validation and report changes.

## 3. Step 7 - Stage and commit with a Jira reference

### Actions performed

The final validation changes and this report were staged and committed using a
Jira-aware Conventional Commit:

```bash
git add package.json test/unit/routes.test.js LAB_REPORT.md
git commit -m "test(DEVOPS-5): enforce coverage and document lab results"
```

### Expected result

The commit should:

- contain the `DEVOPS-5` Jira key;
- describe one logical change;
- appear in the branch history;
- be linkable to the Jira issue through GitHub for Jira.

### Evidence to insert

**[Insert screenshot here: terminal showing `git status`, the `git add`
command, and the successful commit summary.]**

The screenshot should clearly show the branch name, the Jira key in the commit
message, and the list of files committed.

## 4. Step 8 - Push the feature branch

### Command

```bash
git push origin feature/DEVOPS-5-version-endpoint
```

### Expected result

The remote branch should be updated successfully. The push should trigger no
branch-only workflow in the current configuration, but it makes the branch
available for the pull request and Jira development links.

### Evidence to insert

**[Insert screenshot here: terminal showing the successful `git push` and the
remote branch name.]**

## 5. Step 9 - Pull Request

Create a pull request from
`feature/DEVOPS-5-version-endpoint` into `main`.

### Pull request information

- **Title:** `DEVOPS-5 | Implement and validate the version endpoint`
- **Description:** Explain that the `/version` endpoint reads the package
  version, that coverage thresholds are now enforced, and that direct router
  tests were added to keep route modules covered.
- **Review:** Assign another team member.
- **Merge rule:** Merge only after the CI workflow succeeds.

### Suggested pull request description

```text
## What was done
- Implemented GET /version using package.json as the source of truth.
- Enforced the documented Vitest coverage thresholds.
- Added direct tests for the auto-mounted routers.
- Added an English lab execution report.

## Validation
- ESLint passes on src and test.
- 18 tests pass.
- Coverage: 98% statements, 100% lines, 90% functions, 81.25% branches.
```

### Evidence to insert

**[Insert screenshot here: GitHub pull request page showing the title,
`DEVOPS-5` in the title or description, source and target branches, reviewer,
and the changed-files summary.]**

## 6. Step 3 - Build with GitHub Actions

The workflow is located at `.github/workflows/ci.yml`. It performs these
actions:

1. Checks out the repository.
2. Installs Node.js 20.
3. Runs `npm ci`.
4. Runs `npm run lint`.
5. Runs `npm test -- --coverage`.
6. Uploads the `coverage/` directory as the `coverage-report` artifact.

### Expected CI result

The `build-and-test` job should be green. The expected successful steps are:

```text
Checkout repository       Passed
Setup Node                Passed
Install dependencies      Passed
Lint                      Passed
Test (with coverage)      Passed
Upload coverage artifact  Passed
```

### Evidence to insert

**[Insert screenshot here: GitHub Actions run summary with the `build-and-test`
job marked successful and all workflow steps green.]**

The screenshot should include the workflow run name, commit SHA, branch or pull
request, and the green conclusion.

### Confirmed remote result

The CI run for commit `3adf7e9` completed successfully:

- **Workflow:** CI
- **Run:** [GitHub Actions run 7](https://github.com/Damien-Esilv/devops-lab-node-js-project/actions/runs/38179323222)
- **Job:** `build-and-test`
- **Conclusion:** Success
- **Pull request:** [PR #2](https://github.com/Damien-Esilv/devops-lab-node-js-project/pull/2)

## 7. Coverage artifact

After the workflow completes:

1. Open the CI workflow run in GitHub.
2. Open the run summary.
3. Locate the `coverage-report` artifact.
4. Download and extract it.
5. Open `coverage/index.html`.

### Local observed result

The same command used by CI produced:

```text
Test Files  8 passed (8)
Tests       18 passed (18)
Statements  98% (49/50)
Branches    81.25% (13/16)
Functions   90% (9/10)
Lines       100% (43/43)
```

These values satisfy the enforced minimums:

| Metric | Minimum | Observed | Result |
|---|---:|---:|---|
| Statements | 80% | 98% | Pass |
| Branches | 70% | 81.25% | Pass |
| Functions | 80% | 90% | Pass |
| Lines | 80% | 100% | Pass |

### Evidence to insert

**[Insert screenshot here: `coverage/index.html` showing the overall
coverage summary and the listed source files.]**

The screenshot should make the green coverage indicators and all four
threshold values readable.

## 8. Step 4 - Test results

### Local commands

```bash
npm run lint
npm test
npm test -- --coverage
```

### Actual validation result

- ESLint passed for `src` and `test`.
- All 18 tests passed.
- Integration tests cover `/version`, `/info`, `/boom`, and `/health`.
- Unit tests cover application information, error handling, status formatting,
  and the auto-mounted routers.
- Coverage thresholds passed.

### Expected behavior of `/version`

```bash
curl http://localhost:3000/version
```

Expected response:

```json
{
  "version": "1.0.0"
}
```

### Evidence to insert

**[Insert screenshot here: terminal or browser showing a `200` response from
`GET /version` with the JSON version payload.]**

## 9. Jira verification

Open the `DEVOPS-5` issue in Jira after the commit, push, pull request, and CI
run are visible to the integrations.

### Expected Development panel

- Branch: `feature/DEVOPS-5-version-endpoint`
- Commit containing `DEVOPS-5`
- Pull request linked to the issue
- Build status: Passed
- Pull request status: Review or Done, depending on the workflow stage

### Evidence to insert

**[Insert screenshot here: Jira `DEVOPS-5` issue with the Development panel
expanded.]**

The screenshot should show the linked branch, commit, pull request, and
successful build status.

## 10. Final checklist

- [x] Feature branch uses the Jira issue key.
- [x] `/version` returns the package version.
- [x] Tests pass locally.
- [x] Lint passes locally.
- [x] Coverage thresholds are configured and satisfied.
- [x] Coverage report is generated in `coverage/`.
- [x] CI workflow is present and configured to upload the coverage artifact.
- [ ] Feature branch pushed to GitHub.
- [ ] Pull request created and reviewed.
- [x] CI run confirmed green on GitHub.
- [ ] Coverage artifact downloaded and inspected.
- [ ] Jira Development panel confirmed.

The remaining unchecked items require opening the GitHub artifact and Jira web
interfaces. The pull request is open and mergeable; it should be merged only
after review.
