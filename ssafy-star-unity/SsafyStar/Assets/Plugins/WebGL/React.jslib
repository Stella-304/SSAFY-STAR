mergeInto(LibraryManager.library, {
  GetNickName: function (accessNumber) {
    window.dispatchReactUnityEvent("GetNickName", accessNumber);
  },
});