mergeInto(LibraryManager.library, {
  GetUser: function (accessNumber) {
    window.dispatchReactUnityEvent("GetUser", accessNumber);
  },
});