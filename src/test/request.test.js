/* eslint-disable no-underscore-dangle */
import chai from "chai";
import chaiHttp from "chai-http";
import server from "../index";

const { expect } = chai;
chai.use(chaiHttp);

let token;

const signinUrl = "/api/v1/auth/signin";
const getMyRequestUrl = "/api/v1/requests/my-requests";

describe("Get Requests", () => {
  before("with correct credentials", done => {
    const user = {
      userEmail: "jonashyaka2@gmail.com",
      userPassword: "Root1234@"
    };
    chai
      .request(server)
      .post(signinUrl)
      .send(user)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        expect(res).to.have.status(200);
        expect(res.body.data).to.have.property("userToken");

        token = res.body.data.userToken;

        done();
      });
  });
  it("when they are logged In", done => {
    chai
      .request(server)
      .get(getMyRequestUrl)
      .set("Authorization", `Bearer ${token}`)
      .send()
      .end((_err, res) => {
        if (_err) done(_err);
        expect(res.status).to.eq(200);
        done();
      });
  });
});
