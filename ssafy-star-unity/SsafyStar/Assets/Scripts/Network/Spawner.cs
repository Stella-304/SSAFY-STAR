using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using Fusion.Sockets;

[RequireComponent(typeof(NetworkRunner))]
[RequireComponent(typeof(NetworkEvents))]
public class Spawner : MonoBehaviour, INetworkRunnerCallbacks
{
    public NetworkObject playerPrefab;

    //로컬 플레이어 입력
    CharacterInputHandler characterInputHandler;

    private void Start()
    {
        
    }

    private void SpawnPlayer(NetworkRunner runner, PlayerRef playerRef)
    {
        // Random spawnpoint lookup and spawn
        Vector3 spawnPoint = Utils.GetRandomSpawnPoint();

        NetworkObject player = runner.Spawn(playerPrefab, spawnPoint, Quaternion.identity, playerRef);

        // Set player instance as PlayerObject so we can easily get it from other locations
        runner.SetPlayerObject(playerRef, player);

        // Player must be always interested to his NetworkObject to prevent getting out of AoI (typically teleporting after setting AoI position)
        runner.SetPlayerAlwaysInterested(playerRef, player, true);
    }

    public void OnPlayerJoined(NetworkRunner runner, PlayerRef player)
    {
        Debug.Log("OnPlayerJoined");

        if(runner.IsServer)
        {
            Debug.Log("서버가 존재합니다. 플레이어를 스폰합니다.");
            SpawnPlayer(runner, player);
        }
        else
        {
            Debug.Log("스폰 실패");
        }
    }

    public void OnPlayerLeft(NetworkRunner runner, PlayerRef player)
    {
        if (runner.IsServer == false && runner.IsSharedModeMasterClient == false)
            return;

        Debug.Log("OnPlayerLeft");
    }

    public void OnInput(NetworkRunner runner, NetworkInput input)
    {
        if(characterInputHandler == null && NetworkPlayer.Local != null)
        {
            characterInputHandler = NetworkPlayer.Local.GetComponent<CharacterInputHandler>();
        }

        if(characterInputHandler != null)
        {
            input.Set(characterInputHandler.GetNetworkInput());
        }
    }

    public void OnInputMissing(NetworkRunner runner, PlayerRef player, NetworkInput input)
    {
        Debug.Log("OnInputMissing");
    }


    public void OnConnectedToServer(NetworkRunner runner)
    {
        Debug.Log("OnConnectedToServer");
    }

    public void OnShutdown(NetworkRunner runner, ShutdownReason shutdownReason)
    {
        Debug.Log("OnShutdown");
    }
    public void OnDisconnectedFromServer(NetworkRunner runner)
    {
        Debug.Log("OnDisconnectedFromServer");
    }

    public void OnConnectRequest(NetworkRunner runner, NetworkRunnerCallbackArgs.ConnectRequest request, byte[] token)
    {
        Debug.Log("OnConnectRequest");
    }

    public void OnConnectFailed(NetworkRunner runner, NetAddress remoteAddress, NetConnectFailedReason reason)
    {
        Debug.Log("OnConnectFailed");
    }

    public void OnCustomAuthenticationResponse(NetworkRunner runner, Dictionary<string, object> data)
    {
    }

    public void OnHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken)
    {
    }

    public void OnReliableDataReceived(NetworkRunner runner, PlayerRef player, ArraySegment<byte> data)
    {
    }

    public void OnSceneLoadDone(NetworkRunner runner)
    {
    }

    public void OnSceneLoadStart(NetworkRunner runner)
    {
    }

    public void OnSessionListUpdated(NetworkRunner runner, List<SessionInfo> sessionList)
    {
    }
    public void OnUserSimulationMessage(NetworkRunner runner, SimulationMessagePtr message)
    {
    }

}
