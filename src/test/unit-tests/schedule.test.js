import chai from 'chai';
import sinon from 'sinon';
import cron from 'node-cron';
import Schedule from '../../services/scheduler';

const { expect } = chai;

describe('Scheduler', () => {
  it('Should run scheduler Function', async (done) => {
    const deleteSpy = sinon.spy(cron, 'schedule');
    const schedule = new Schedule('* * * * * *');
    schedule.deleteSchedule();
    expect(deleteSpy.called).to.be.true;
    done();
  });
});
