import chai from "chai";
import chaiHttp from "chai-http";

import app from "../index";

chai.should();
chai.use(chaiHttp);

describe("server test", () => {
  it("should handle the unknown routes", done => {
    chai
      .request(app)
      .get("/unknownroute")
      .send({ data: "nothing" })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.status.should.equal(404);
        return done();
      });
  });
});
