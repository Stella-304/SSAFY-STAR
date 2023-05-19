mergeInto(LibraryManager.library, {
  GetUser: function (accessNumber) {
    window.dispatchReactUnityEvent("GetUser", accessNumber);
  },
    NicknameChanged: function (changed) {
    window.dispatchReactUnityEvent("NicknameChanged", changed);
  },
});