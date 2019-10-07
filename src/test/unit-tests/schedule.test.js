import chai from 'chai';
import sinon from 'sinon';
import Schedule from '../../services/scheduler';
import chat from '../../services/chatService';

const { expect } = chai;

describe('Scheduler', () => {
  let clock;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });
  it('Should run scheduler Function', async (done) => {
    const deleteSpy = sinon.spy(chat, 'deleteMessages');
    const schedule = new Schedule('* * * * * *');
    schedule.deleteSchedule();
    clock.tick(3000);
    expect(deleteSpy.called).to.be.true;
    done();
  });
});
