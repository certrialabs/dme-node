'use strict';

var nock = require('nock');
var expect = require('chai').expect;
var core = require('./core');
var ManagedDns = require('./managedDns');

describe('ManagedDns', function() {
  var client;
  var headers;
  var payload;

  beforeEach(function() {
    client = core.createClient({
      apikey: 'testApiKey',
      secret: 'testSecret',
      debug: true
    });
    this.sandbox.stub(client, '_generateHeaders').callsFake(function() {
      return headers;
    });

    headers = {
      test: 'test'
    };

    payload = {
      data: 'test'
    };
  });

  it('exists', function() {
    expect(ManagedDns).to.be.ok;
    expect(ManagedDns.createManagedDNS).to.be.ok;
  });

  describe('createManagedDNS', function() {
    it('throws an error if no clinet is passed', function() {
      try {
        ManagedDns.createManagedDNS();
      } catch (ex) {
        expect(ex.message).to.be.eql('ManagedDNS must be constructed with a client');
      }
    });

    it('gets instanciated wtih the client', function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      expect(managedDns).to.be.ok;
      expect(managedDns.client).to.be.eql(client);
    });
  });

  describe('getAllDomains', function() {
    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .get('/dns/managed')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.getAllDomains();
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('updateMultipleDomains', function() {
    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateMultipleDomains();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to edit domains');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .put('/dns/managed', payload)
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.updateMultipleDomains(payload);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('createDomain', function() {
    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.createDomain();
      }catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to create domain');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .post('/dns/managed', payload)
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.createDomain(payload);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });

    describe('multiple', function() {

      it('returns with correct response when creating multiple domains', async function() {
        nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
          reqheaders: headers
        })
          .post('/dns/managed', payload)
          .reply(200, {
            status: 'ok'
          });

        var managedDns = ManagedDns.createManagedDNS(client);

        var response = await managedDns.createMultipleDomains(payload);
        expect(response).to.be.eql({
          status: 'ok'
        });
      });

      it('throws an error if no payload is passed', async function() {
        var managedDns = ManagedDns.createManagedDNS(client);

        try {
          await managedDns.createMultipleDomains();
        }catch (ex) {
          return expect(ex.message).to.be.eql('Must supply payload to create domain');
        }

        throw new Error('Should not get here.');
      });

    });

  });

  describe('getDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.getDomain();
      }catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .get('/dns/managed/1')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.getDomain(1);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('deleteDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.deleteDomain();
      }catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .delete('/dns/managed/1')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.deleteDomain(1);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });

    describe('multiple', function() {

      it('throws an error if no id is passed', async function() {
        var managedDns = ManagedDns.createManagedDNS(client);

        try {
          await managedDns.deleteMultipleDomains();
        }catch (ex) {
          return expect(ex.message).to.be.eql('Must supply payload to remove domain');
        }

        throw new Error('Should not get here.');
      });

      it('returns with correct response', async function() {
        nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
          reqheaders: headers
        })
          .delete('/dns/managed')
          .reply(200, {
            status: 'ok'
          });

        var managedDns = ManagedDns.createManagedDNS(client);

        var response = await managedDns.deleteMultipleDomains({});
        expect(response).to.be.eql({
          status: 'ok'
        });
      });

    });
  });

  describe('updateDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateDomain();
      }catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateDomain(1);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to edit specified domain');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .put('/dns/managed/1', payload)
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.updateDomain(1, payload);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('getRecordsForDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.getRecordsForDomain();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .get('/dns/managed/1/records')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.getRecordsForDomain(1);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('createRecordsForDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.createRecordsForDomain();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.createRecordsForDomain(1);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to create record for specified domain');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .post('/dns/managed/1/records/createMulti', payload)
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.createRecordsForDomain(1, payload);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('createRecordForDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.createRecordForDomain();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.createRecordForDomain(1);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to create record for specified domain');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .post('/dns/managed/1/records')
        .reply(200);

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.createRecordForDomain(1, {});
      expect(response).to.be.equal('');
    });
  });

  describe('deleteRecordForDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.deleteRecordForDomain();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.deleteRecordForDomain(1);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid record id given');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .delete('/dns/managed/1/records/2')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.deleteRecordForDomain(1, 2);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('updateRecordForDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateRecordForDomain();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateRecordForDomain(1);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid record id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateRecordForDomain(1, 2);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to create record for specified domain');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .put('/dns/managed/1/records/2')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.updateRecordForDomain(1, 2, {});
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

  describe('updateRecordsForDomain', function() {
    it('throws an error if no id is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateRecordsForDomain();
      } catch (ex) {
        return expect(ex.message).to.be.eql('Invalid domain id given');
      }

      throw new Error('Should not get here.');
    });

    it('throws an error if no payload is passed', async function() {
      var managedDns = ManagedDns.createManagedDNS(client);

      try {
        await managedDns.updateRecordsForDomain(1);
      } catch (ex) {
        return expect(ex.message).to.be.eql('Must supply payload to create record for specified domain');
      }

      throw new Error('Should not get here.');
    });

    it('returns with correct response', async function() {
      nock('https://api.sandbox.dnsmadeeasy.com/V2.0', {
        reqheaders: headers
      })
        .put('/dns/managed/1/records/updateMulti')
        .reply(200, {
          status: 'ok'
        });

      var managedDns = ManagedDns.createManagedDNS(client);

      var response = await managedDns.updateRecordsForDomain(1, 2);
      expect(response).to.be.eql({
        status: 'ok'
      });
    });
  });

});
