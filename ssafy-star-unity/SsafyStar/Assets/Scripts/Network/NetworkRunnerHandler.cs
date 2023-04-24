using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using Fusion.Sockets;
using UnityEngine.SceneManagement;
using System;
using System.Linq;
using System.Threading.Tasks;

public class NetworkRunnerHandler : MonoBehaviour
{
    public NetworkRunner networkRunnerPrefab;

    NetworkRunner networkRunner;

    private void Start()
    {
        networkRunner = Instantiate(networkRunnerPrefab);
        networkRunner.name = "Network runner";


        var clientTask = InitializeNetworkRunner(networkRunner,
                                                 GameMode.AutoHostOrClient,
                                                 NetAddress.Any(),
                                                 SceneManager.GetActiveScene().buildIndex,
                                                 null);
        Debug.Log($"Server - Network Runner ½ÇÇà");
    }

    protected virtual Task InitializeNetworkRunner(NetworkRunner runner, GameMode gameMode, NetAddress adress, SceneRef scene, Action<NetworkRunner> initialized)
    {
        var sceneManager = runner.GetComponents(typeof(MonoBehaviour)).OfType<INetworkSceneManager>().FirstOrDefault();

        if (sceneManager != null)
        {
            sceneManager = runner.gameObject.AddComponent<NetworkSceneManagerDefault>();

        }

        runner.ProvideInput = true;

        return runner.StartGame(new StartGameArgs
        {
            GameMode = gameMode,
            Address = adress,
            Scene = scene,
            SessionName = "MainSquare",
            Initialized = initialized,
            SceneManager = sceneManager
        });
    }
}
