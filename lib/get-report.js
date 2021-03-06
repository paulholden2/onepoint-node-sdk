const _ = require('lodash');

/**
 * @memberof OnePoint
 * @instance
 * @param {(object|number)} options - Report ID or query object.
 * @param {function} callback - Called once the report info is retrieved.
 */
function getReport(options, callback) {
  var asArray = true;

  if (typeof options === 'number') {
    asArray = false;
    options = {
      where: {
        settingsId: options
      }
    };
  }

  if (!_.has(options, 'where')) {
    return this.listReports(callback);
  }

  var where = _.get(options, 'where');

  this.listReports((err, reports) => {
    if (err) {
      return callback(err);
    }

    var results = _.filter(reports, where);

    if (results.length === 0) {
      callback(new Error('Invalid report: ' + where));
    } else {
      callback(null, results.length === 1 && !asArray ? results[0] : results);
    }
  });
};

module.exports = getReport;
