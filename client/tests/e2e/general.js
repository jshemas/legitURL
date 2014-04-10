'use strict';

describe('general site e2e - ', function() {
	var ptor = protractor.getInstance();
	describe('homepage - ', function() {
		it('should be able to get to homepage', function() {
			browser.get('/');
			expect(browser.getLocationAbsUrl()).toMatch("/");
			expect(element.all(by.css('h2')).first().getText()).toMatch('Legit URL');
			expect(ptor.findElement(protractor.By.css('.createURLSuccess')).getText()).toEqual('');
			expect(ptor.findElement(protractor.By.css('.createURLError')).getText()).toEqual('');
		});
		it('should be able to see url success', function() {
			browser.get('/');
			expect(browser.getLocationAbsUrl()).toMatch("/");
			expect(element.all(by.css('h2')).first().getText()).toMatch('Legit URL');
			expect(ptor.findElement(protractor.By.css('.createURLSuccess')).getText()).toEqual('');
			expect(ptor.findElement(protractor.By.css('.createURLError')).getText()).toEqual('');
			element(by.model('orgURL')).sendKeys('www.google.com');
			var urlButton = ptor.findElement(protractor.By.className('buildURL'));
			urlButton.click();
			ptor.sleep(100);
			expect(ptor.findElement(protractor.By.css('.createURLSuccess')).getText()).toEqual('');
			expect(ptor.findElement(protractor.By.css('.createURLError')).getText()).toEqual('');
			ptor.sleep(1000);
		});
	});
});