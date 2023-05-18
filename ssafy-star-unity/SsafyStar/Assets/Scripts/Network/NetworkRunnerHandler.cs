using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using Fusion.Sockets;
using UnityEngine.SceneManagement;
using System;
using System.Linq;
using System.Threading.Tasks;
using Unity.VisualScripting;

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
        //Debug.Log($"Server - Network Runner 실행");
    }

    public void HostMigrationStart(HostMigrationToken hostMigrationToken)
    {
        networkRunner = Instantiate(networkRunnerPrefab);
        networkRunner.name = "Network runner - Migrated";

        var clientTask = InitializeNetworkRunnerHostMigration(networkRunner, hostMigrationToken);
        //Debug.Log($"Server - HostMigration 실행");
    }

    INetworkSceneManager GetSceneManager(NetworkRunner runner)
    {
        var sceneManager = runner.GetComponents(typeof(MonoBehaviour)).OfType<INetworkSceneManager>().FirstOrDefault();

        if (sceneManager != null)
        {
            sceneManager = runner.gameObject.AddComponent<NetworkSceneManagerDefault>();
        }

        return sceneManager;
    }

    protected virtual Task InitializeNetworkRunner(NetworkRunner runner, GameMode gameMode, NetAddress adress, SceneRef scene, Action<NetworkRunner> initialized)
    {
        var sceneManager = GetSceneManager(runner);

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

    protected virtual Task InitializeNetworkRunnerHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken)
    {
        var sceneManager = GetSceneManager(runner);

        runner.ProvideInput = true;

        return runner.StartGame(new StartGameArgs
        {
            //hostMigrationTocken에 존재하기 때문에 무시할 수 있다.
            //GameMode = gameMode,
            //Address = adress,
            //Scene = scene,
            //SessionName = "MainSquare",
            //Initialized = initialized,
            SceneManager = sceneManager,
            HostMigrationToken = hostMigrationToken, //Runner를 재시작할 모든 정보를 가지고 있다.
            HostMigrationResume = HostMigrationResume,
        });
    }

    void HostMigrationResume(NetworkRunner runner)
    {
        //Debug.Log($"HostMigrationResume started");

        // Get a reference for each Network object from the old Host
        foreach (var resumeNetworkObject in runner.GetResumeSnapshotNetworkObjects())
        {
            // Grab all the player objects, they have a NetworkCharacterControllerPrototypeCustom
            if (resumeNetworkObject.TryGetBehaviour<NetworkCharacterControllerPrototypeCustom>(out var characterController))
            {
                runner.Spawn(resumeNetworkObject, position: characterController.ReadPosition(), rotation: characterController.ReadRotation(), onBeforeSpawned: (runner, newNetworkObject) =>
                {
                    newNetworkObject.CopyStateFrom(resumeNetworkObject);

                });
            }
        }

        //Debug.Log($"HostMigrationResume completed");
    }
}
