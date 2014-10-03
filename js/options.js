// Saves options to chrome.storage
function save_options() {
  var collapseVal = document.getElementById('collapse').value;

  chrome.storage.sync.set({
    'collapse': collapseVal
  }, function() {
    // Update status to let user know options were saved
    var status = document.getElementById('status');
    status.textContent = 'Options saved. Changes only take place on new/reloaded pages.';
    setTimeout(function() {
      status.textContent = '';
    }, 5000);
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage
function restore_options() {
  // defaults to single if nothing is set
  chrome.storage.sync.get({
    'collapse': 'single'
  }, function(items) {
    document.getElementById('collapse').value = items.collapse;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
