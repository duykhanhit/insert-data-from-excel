const surveyRouter = require('./surveyRouters');

module.exports = (app) => {
  app.use('/api/survey', surveyRouter)
}