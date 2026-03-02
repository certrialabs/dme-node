## dme-sdk
### A node module for DNSMadeEasy's V2.0 API

### To use

- Import the module

```javascript
var dme = require('dme-sdk');
```

- Setup config

```javascript
var config = {
	apikey: <INSERT_APIKEY>,
	secret: <INSERT_APISECRET>,
	debug: false
};
```

- Create client

```javascript
var client = dme.createClient(config);
```

- Access ManagedDNS

```javascript
var mgdns = dme.ManagedDNS.createManagedDNS(client);
mgdns.getAllDomains()
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});
```

- Access Usage

```javascript
var usage = dme.Usage.create(client);
usage.getUsage()
	.then(function(data) {
		console.log(data);
	})
	.catch(function(err) {
		console.log(err);
	});
```

### Working submodules

#### ManagedDNS

* `getDomain(domainId)`
* `createDomain(payload)`
* `updateDomain(domainId, payload)`
* `deleteDomain(domainId)`
* `deleteDomain(domainId)`
* `getAllDomains()`
* `updateMultipleDomains(payload)`
* `deleteMultipleDomains(payload)`
* `createRecordForDomain(domainId, payload)`
* `updateRecordForDomain(domainId, recordId, payload)`
* `deleteRecordForDomain(domainId, recordId)`
* `getRecordsForDomain(domainId)`
* `createRecordsForDomain(domainId, payload)`
* `updateRecordsForDomain(domainId, payload)`

#### Usage

* `getUsage()`

### Development & testing

#### Test stack

Tests use **Mocha**, **Chai**, **Sinon**, and **nock**. Async tests use native **async/await** (no co-mocha).

- **Mocha** – test runner
- **Chai** – assertions (`expect`)
- **Sinon** – stubs/mocks (via `this.sandbox` in each test)
- **nock** – HTTP mocking
- Global hooks and Chai plugins are loaded from `lib/test-setup.js` (run with Mocha’s `--file` so `before` / `beforeEach` / `afterEach` are available).

#### How to run tests

```bash
npm test
```

Runs all specs under `lib/**/*.spec.js` with the setup file loaded first.

#### How to run coverage

```bash
npm run coverage
```

Uses **nyc** (Istanbul) to report coverage for the same test set.

#### What changed from the old setup

- **Removed co-mocha** – Tests that used generator functions (`function*`, `yield`) were converted to `async function()` and `await`.
- **Modern Sinon** – Uses `sinon.createSandbox()` and `stub(...).callsFake(fn)` instead of the removed `stub(obj, 'meth', fn)` form.
- **Setup file** – Test setup lives in `lib/test-setup.js` and is loaded with Mocha’s `--file` (not `--require`) so Mocha globals are defined.
- **Coverage** – Replaced **istanbul** with **nyc** (maintained fork).
