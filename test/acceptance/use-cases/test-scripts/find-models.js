'use strict';
const app = require('../../../../');
const expect = require('../../../helpers/expect');
const fs = require('fs-extra');
const loopback = require('loopback');
const ModelClass = require('../../../../component/datamodel/model');
const path = require('path');
const testSupport = require('../../../helpers/test-support');
const util = require('util');
const workspaceManager = require('../../../../component/workspace-manager');

const ModelDefinition = app.models.ModelDefinition;

module.exports = function() {
  var testsuite = this;

  this.When(/^I query for the model '(.+)' in workspace '(.+)'$/,
  function(modelName, workspaceName, next) {
    const dir = testSupport.givenSandboxDir(workspaceName);
    testsuite.workspace = workspaceManager.getWorkspaceByFolder(dir);
    testsuite.modelName = modelName;
    const modelId = 'common.models.' + testsuite.modelName;
    const filter = {
      where: {id: modelId},
    };
    const options = {workspaceId: testsuite.workspace.getId()};
    ModelDefinition.find(filter, options, function(err, data) {
      if (err) return next(err);
      testsuite.modelDef = data;
      next();
    });
  });

  this.Then(/^the model definition is returned$/, function(next) {
    expect(Object.keys(testsuite.modelDef)).to.include.members([
      'name',
      'idInjection',
    ]);
    next();
  });
};