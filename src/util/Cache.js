function localStorageAvailable() {
	try {
		var storage = window['localStorage'],
			x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return false;
	}
}

if (!localStorageAvailable()) {
  window.localStorage = {
    setItem: function () {},
    getItem: function () {},
    removeItem: function () {}
  }
}

module.exports = {
  get: function(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set: function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
