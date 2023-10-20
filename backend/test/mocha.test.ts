import * as assert from 'assert';
import { AreaService } from '../src/area/area.service';
import { AreaModel, IArea } from '../src/models/area.model';
import { Model } from 'mongoose';

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

  describe('AreaService', function () {
    it('should return a valid cron expression', function () {
      const areaModel: Model<IArea> = {} as Model<IArea>;

      const areaService = new AreaService(areaModel);

      const cronExpression = areaService.timerToCron("M18", "8:45:50", "d2020-12-12");
      assert.equal(cronExpression, '0/18 * * * *');
    });
  });

  describe('AreaService', function () {
    it('should return a valid cron expression', function () {
      const areaModel: Model<IArea> = {} as Model<IArea>;

      const areaService = new AreaService(areaModel);

      const cronExpression = areaService.timerToCron("H18", "8:45:50", "d2020-12-12");
      assert.equal(cronExpression, '47 0/18 * * *');
    });
  });

  describe('AreaService', function () {
    it('should return a valid cron expression', function () {
      const areaModel: Model<IArea> = {} as Model<IArea>;

      const areaService = new AreaService(areaModel);

      const cronExpression = areaService.timerToCron("W1", "8:45:50", "d2020-12-12");
      assert.equal(cronExpression, '1 0 0 * 1');
    });
  });

  describe('AreaService', function () {
    it('should return a valid cron expression day', function () {
      const areaModel: Model<IArea> = {} as Model<IArea>;

      const areaService = new AreaService(areaModel);

      const cronExpression = areaService.timerToCron("D18", "8:45:50", "d2020-12-12");
      assert.equal(cronExpression, '47 8 */18 * *');
    });
  });

  describe('AreaService', function () {
    it('should return a valid cron expression', function () {
      const areaModel: Model<IArea> = {} as Model<IArea>;

      const areaService = new AreaService(areaModel);

      const cronExpression = areaService.timerToCron("m1", "8:45:50", "d2020-12-12");
      assert.equal(cronExpression, '47 8 12 */1 *');
    });
  });
});
