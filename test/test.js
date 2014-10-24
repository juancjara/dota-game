var assert = require("assert")
var Challenge = require('./../assets/js/build/challenge.js').Challenge;
var ItemsSlots = require('./../assets/js/build/itemsSlots').ItemsSlots;

describe('Challenge', function() {
	var c = new Challenge();
  describe('set List', function() {

	  it('should return same list', function() {
			var steps = ['gg', 'ff'];
			assert.deepEqual(steps, c.set(steps).expectedSteps);
			var steps2 = ['hh', 'jj'];
			assert.deepEqual(steps2, c.set(steps2).expectedSteps);
		})

		var steps = ['gg', 'ff'];
		c.set(steps);

		it('currentStep should be 0', function() {
			assert.equal(0, c.currentStep);
		})
		it('wishLength should be set correctly', function() {
			assert.equal(steps.length, c.wishLength);
		})
		it('steps should be clean', function() {
			assert.deepEqual([], c.steps);
		})
	})

	describe('send steps', function() {
		var steps = ['step1', 'step2'];
		var challenge;

		beforeEach(function() {
			challenge = new Challenge();
			challenge.set(steps);
		})

		it('should return update steps', function() {
			var result = challenge.step(steps[0]).expectedSteps;
			assert.deepEqual(['step2'], result);
		})

		
		it('when stupid value is entered should remain the same', function() {
			var result = challenge.step('dummy').expectedSteps;
			assert.deepEqual(steps, result);
		})

		it('when all steps are entered should return [] ', function() {
			challenge.step(steps[0]);
			var result = challenge.step(steps[1]).expectedSteps;
			assert.deepEqual([], result);
		})

		it('when step is entered and expected steps is empty shouldnt do anything', function() {
			challenge.step(steps[0]);
			var result = challenge.step(steps[1]).expectedSteps;
			var result2 = challenge.step('dummy').expectedSteps;
			assert.deepEqual(result, result2);
		})
	})
});

describe('ItemsSlots', function() {
	var i = new ItemsSlots();
	describe('GG', function() {
		it('gggg');
	});
});