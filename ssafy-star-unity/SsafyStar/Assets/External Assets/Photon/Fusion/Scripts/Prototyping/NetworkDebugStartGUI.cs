using System;
using UnityEngine;
using Fusion;
using System.Collections.Generic;

/// <summary>
/// Companion component for <see cref="NetworkDebugStart"/>. Automatically added as needed for rendering in-game networking IMGUI.
/// </summary>
[RequireComponent(typeof(NetworkDebugStart))]
[AddComponentMenu("Fusion/Network Debug Start GUI")]
[ScriptHelp(BackColor = EditorHeaderBackColor.Steel)]
public class NetworkDebugStartGUI : Fusion.Behaviour
{

    /// <summary>
    /// The GUISkin to use as the base for the scalable in-game UI.
    /// </summary>
    [InlineHelp]
    public GUISkin BaseSkin;

    NetworkDebugStart _networkDebugStart;
    string _clientCount;
    bool _isMultiplePeerMode;

    Dictionary<NetworkDebugStart.Stage, string> _nicifiedStageNames;

#if UNITY_EDITOR

    protected virtual void Reset()
    {
        _networkDebugStart = EnsureNetworkDebugStartExists();
        _clientCount = _networkDebugStart.AutoClients.ToString();
        BaseSkin = GetAsset<GUISkin>("e59b35dfeb4b6f54e9b2791b2a40a510");
    }

#endif

    protected virtual void OnValidate()
    {
        ValidateClientCount();
    }

    protected void ValidateClientCount()
    {
        if (_clientCount == null)
        {
            _clientCount = "1";
        }
        else
        {
            _clientCount = System.Text.RegularExpressions.Regex.Replace(_clientCount, "[^0-9]", "");
        }
    }
    protected int GetClientCount()
    {
        try
        {
            return Convert.ToInt32(_clientCount);
        }
        catch
        {
            return 0;
        }
    }

    protected virtual void Awake()
    {
        _nicifiedStageNames = ConvertEnumToNicifiedNameLookup<NetworkDebugStart.Stage>("Fusion Status: ");
        _networkDebugStart = EnsureNetworkDebugStartExists();
        _clientCount = _networkDebugStart.AutoClients.ToString();
        ValidateClientCount();
    }
    protected virtual void Start()
    {
        _isMultiplePeerMode = NetworkProjectConfig.Global.PeerMode == NetworkProjectConfig.PeerModes.Multiple;
        //GameStart();
    }

    protected NetworkDebugStart EnsureNetworkDebugStartExists()
    {
        if (_networkDebugStart)
        {
            if (_networkDebugStart.gameObject == gameObject)
                return _networkDebugStart;
        }

        if (TryGetBehaviour<NetworkDebugStart>(out var found))
        {
            _networkDebugStart = found;
            return found;
        }

        _networkDebugStart = AddBehaviour<NetworkDebugStart>();
        return _networkDebugStart;
    }

    private void Update()
    {
        var nds = EnsureNetworkDebugStartExists();
        if (nds.StartMode != NetworkDebugStart.StartModes.UserInterface)
        {
            return;
        }

        var currentstage = nds.CurrentStage;
        if (currentstage != NetworkDebugStart.Stage.Disconnected)
        {
            return;
        }
    }

    private void GameStart()
    {
        var nds = EnsureNetworkDebugStartExists();
        if (nds.StartMode != NetworkDebugStart.StartModes.UserInterface)
        {
            return;
        }

        var currentstage = nds.CurrentStage;
        if (nds.AutoHideGUI && currentstage == NetworkDebugStart.Stage.AllConnected)
        {
            return;
        }

        nds.StartSharedClient();
    }

    //protected virtual void OnGUI()
    //{

    //    var nds = EnsureNetworkDebugStartExists();
    //    if (nds.StartMode != NetworkDebugStart.StartModes.UserInterface)
    //    {
    //        return;
    //    }

    //    var currentstage = nds.CurrentStage;
    //    if (nds.AutoHideGUI && currentstage == NetworkDebugStart.Stage.AllConnected)
    //    {
    //        return;
    //    }

    //    var holdskin = GUI.skin;

    //    GUI.skin = FusionScalableIMGUI.GetScaledSkin(BaseSkin, out var height, out var width, out var padding, out var margin, out var leftBoxMargin);

    //    GUILayout.BeginArea(new Rect(leftBoxMargin, margin, width, Screen.height));
    //    {
    //        GUILayout.BeginVertical(GUI.skin.window);
    //        {
    //            if (currentstage == NetworkDebugStart.Stage.Disconnected)
    //            {
    //                GUILayout.BeginHorizontal();
    //                {
    //                  GUILayout.Label("Room:", GUILayout.Height(height), GUILayout.Width(width * .33f));
    //                  nds.DefaultRoomName = GUILayout.TextField(nds.DefaultRoomName, 25, GUILayout.Height(height));
    //                }
    //                GUILayout.EndHorizontal();

    //                if (GUILayout.Button("메타버스 들어가기", GUILayout.Height(height)))
    //                {
    //                    nds.StartSharedClient();
    //                }
    //            }
    //            else
    //            {
    //                if (GUILayout.Button("닫기", GUILayout.Height(height)))
    //                {
    //                    _networkDebugStart.ShutdownAll();
    //                }
    //            }

    //            GUILayout.EndVertical();
    //        }
    //    }
    //    GUILayout.EndArea();

    //    GUI.skin = holdskin;
    //}

    // TODO Move to a utility
    public static Dictionary<T, string> ConvertEnumToNicifiedNameLookup<T>(string prefix = null, Dictionary<T, string> nonalloc = null) where T : System.Enum
    {

        System.Text.StringBuilder sb = new System.Text.StringBuilder();

        if (nonalloc == null)
        {
            nonalloc = new Dictionary<T, string>();
        }
        else
        {
            nonalloc.Clear();
        }

        var names = Enum.GetNames(typeof(T));
        var values = Enum.GetValues(typeof(T));
        for (int i = 0, cnt = names.Length; i < cnt; ++i)
        {
            sb.Clear();
            if (prefix != null)
            {
                sb.Append(prefix);
            }
            var name = names[i];
            for (int n = 0; n < name.Length; n++)
            {
                // If this character is a capital and it is not the first character add a space.
                // This is because we don't want a space before the word has even begun.
                if (char.IsUpper(name[n]) == true && n != 0)
                {
                    sb.Append(" ");
                }

                // Add the character to our new string
                sb.Append(name[n]);
            }
            nonalloc.Add((T)values.GetValue(i), sb.ToString());
        }
        return nonalloc;
    }
#if UNITY_EDITOR

    public static T GetAsset<T>(string Guid) where T : UnityEngine.Object
    {
        var path = UnityEditor.AssetDatabase.GUIDToAssetPath(Guid);
        if (string.IsNullOrEmpty(path))
        {
            return null;
        }
        else
        {
            return UnityEditor.AssetDatabase.LoadAssetAtPath<T>(path);
        }
    }
#endif
}
