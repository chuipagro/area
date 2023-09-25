import * as assert from 'assert';

describe('obvious test to see if mocha work 1', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('obvious test', function () {
    it('should return 1', function () {
      assert.equal(1, 1);
    });
    it ('should return 2', function () {
      assert.equal(2, 2);
    });
  });
});

describe('obvious test to see if mocha work 2', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
        assert.equal([1, 2, 3].indexOf(4), -1);
        });
    });
    describe('obvious test', function () {
        it('should return 1', function () {
        assert.equal(1, 1);
        });
        it ('should return 2', function () {
        assert.equal(2, 2);
        });
    });
});
