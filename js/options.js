var YAHNESOptions = (function() {
  /* saves options to chrome.storage */
  var saveOptions = function() {
    var collapseVal = document.getElementById('collapse').value;

    chrome.storage.sync.set({
      'collapse': collapseVal
    }, function() {
      // update status to let user know options were saved
      var status = document.getElementById('status');
      status.textContent = 'Options saved. Changes only take place on new/reloaded pages.';
      setTimeout(function() {
        status.textContent = '';
      }, 5000);
    });
  };

  /* restores select box and checkbox state using the preferences stored in chrome.storage */
  var restoreOptions = function() {
    chrome.storage.sync.get({
      'collapse': 'single' // default to single
    }, function(items) {
      document.getElementById('collapse').value = items.collapse;
    });
  };

  return {
    init: function() {
      // event listeners for options page
      document.addEventListener('DOMContentLoaded', restoreOptions);
      document.getElementById('save').addEventListener('click', saveOptions);
    }
  };
})();

YAHNESOptions.init();
