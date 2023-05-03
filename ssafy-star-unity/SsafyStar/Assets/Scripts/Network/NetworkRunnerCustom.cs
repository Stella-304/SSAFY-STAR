using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class NetworkRunnerCustom : Fusion.Behaviour
{

    NetworkDebugStart _networkDebugStart;

    private void Start()
    {
        GameStart();
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

    public void GameExit()
    {
        _networkDebugStart.Shutdown();
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
}
