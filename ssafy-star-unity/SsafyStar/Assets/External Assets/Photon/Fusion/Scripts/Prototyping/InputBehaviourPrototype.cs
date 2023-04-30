using System;
using System.Collections.Generic;
using Fusion;
using Fusion.Sockets;
using UnityEngine;
using static UnityEngine.Advertisements.Advertisement;

/// <summary>
/// A simple example of Fusion input collection. This component should be on the same GameObject as the <see cref="NetworkRunner"/>.
/// </summary>
[ScriptHelp(BackColor = EditorHeaderBackColor.Steel)]
public class InputBehaviourPrototype : Fusion.Behaviour, INetworkRunnerCallbacks
{

    public NetworkRunner runnerPrefab;

    public void OnInput(NetworkRunner runner, NetworkInput input)
    {
        var frameworkInput = new NetworkInputPrototype();

        if (Input.GetKey(KeyCode.W))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_FORWARD, true);
        }

        if (Input.GetKey(KeyCode.S))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_BACKWARD, true);
        }

        if (Input.GetKey(KeyCode.A))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_LEFT, true);
        }

        if (Input.GetKey(KeyCode.D))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_RIGHT, true);
        }

        if (Input.GetKey(KeyCode.Space))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_JUMP, true);
        }

        if (Input.GetKey(KeyCode.C))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_CROUCH, true);
        }

        if (Input.GetKey(KeyCode.E))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_ACTION1, true);
        }

        if (Input.GetKey(KeyCode.Q))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_ACTION2, true);
        }

        if (Input.GetKey(KeyCode.F))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_ACTION3, true);
        }

        if (Input.GetKey(KeyCode.G))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_ACTION4, true);
        }

        if (Input.GetKey(KeyCode.R))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_RELOAD, true);
        }

        if (Input.GetMouseButton(0))
        {
            frameworkInput.Buttons.Set(NetworkInputPrototype.BUTTON_FIRE, true);
        }

        input.Set(frameworkInput);
    }

    public void OnInputMissing(NetworkRunner runner, PlayerRef player, NetworkInput input) { }

    public void OnConnectedToServer(NetworkRunner runner) { }
    public void OnConnectFailed(NetworkRunner runner, NetAddress remoteAddress, NetConnectFailedReason reason) { }
    public void OnConnectRequest(NetworkRunner runner, NetworkRunnerCallbackArgs.ConnectRequest request, byte[] token) { }
    public void OnDisconnectedFromServer(NetworkRunner runner) { }
    public void OnPlayerJoined(NetworkRunner runner, PlayerRef player)
    {
        Debug.Log("�÷��̾� ���� id:" + runner.UserId);

        //if (player == Object.InputAuthority)
        //{
        //    Debug.Log("�� ����");
        //}
    }
    public void OnPlayerLeft(NetworkRunner runner, PlayerRef player)
    {
        Debug.Log("runner transform : " + runner.transform.position);

        Debug.Log("�÷��̾� ���� id:" + runner.UserId);
    }
    public void OnUserSimulationMessage(NetworkRunner runner, SimulationMessagePtr message) { }
    public void OnShutdown(NetworkRunner runner, ShutdownReason shutdownReason)
    {

        // ȣ��Ʈ ����ũ���̼����� �˴ٿ� �Ǿ����� Ȯ��
        if (shutdownReason == ShutdownReason.HostMigration)
        {
            // ...
            Debug.Log("migration-shutdown + id:" + runner.UserId);
        }
        else
        {
            // �Ϲ����� �˴ٿ��϶�
            Debug.Log("shutdown + id:" + runner.UserId);
        }
    }
    public void OnSessionListUpdated(NetworkRunner runner, List<SessionInfo> sessionList) { }
    public void OnReliableDataReceived(NetworkRunner runner, PlayerRef player, ArraySegment<byte> data)
    {

    }

    public void OnSceneLoadDone(NetworkRunner runner)
    {
        Debug.Log("load finished");
    }

    public void OnSceneLoadStart(NetworkRunner runner)
    {
    }

    public void OnCustomAuthenticationResponse(NetworkRunner runner, Dictionary<string, object> data)
    {
    }

    public async void OnHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken)
    {
        Debug.Log("������ ������ ���ο� ������ ã�´�");

        //���� runner�� �����Ѵ�.
        await runner.Shutdown(shutdownReason: ShutdownReason.HostMigration);

        //networkRunnerHandler�� ã�� �� ȣ��Ʈ ���̱׷��̼� ����
        //FindObjectOfType<NetworkRunnerHandler>().HostMigrationStart(hostMigrationToken);

        NetworkRunner newRunner = Instantiate(runnerPrefab);//���ο� ���� ����
        newRunner.name = "Network runner - Migrated";

        StartGameResult result = await newRunner.StartGame(new StartGameArgs()
        {
            HostMigrationToken = hostMigrationToken,
            HostMigrationResume = HostMigrationResume,
        });
        Debug.Log("�� ���� ���� �Ϸ�");

        if (result.Ok == false)
        {
            Debug.LogWarning(result.ShutdownReason);
        }
        else
        {
            Debug.Log("Done");
        }

        Debug.Log("���ο� ������ ã�Ҵ�");
    }

    void HostMigrationResume(NetworkRunner runner)
    {
        Debug.Log("resume");

        foreach (var resumeNO in runner.GetResumeSnapshotNetworkObjects())
        {
            Debug.Log(resumeNO.name);
            // ��Ʈ��ũ ��ü�� ��ġ/ȸ���� ��Ÿ���� �� ���Ǵ� ��� ��Ʈ��ũ ���� ����(NetworkTransform, NetworkRigidBody...)
            if (resumeNO.TryGetBehaviour<NetworkPositionRotation>(out var posRot))
            {
                runner.Spawn(resumeNO, position: posRot.ReadPosition(), rotation: posRot.ReadRotation(), onBeforeSpawned: (runner, newNO) =>
                {
                    Debug.Log("�ٽ� �����ϱ� id:" + runner.UserId);
                    // ���� NetworkObject�� ��� ���°� �ʿ��� ��� NetworkObject�� ȣ���մϴ�.
                    newNO.CopyStateFrom(resumeNO);

                    // �κ� ���¸� �ʿ��� ��� Ư�� ��Ʈ��ũ ���ۿ����� ����
                    if (resumeNO.TryGetBehaviour<NetworkBehaviour>(out var myCustomNetworkBehaviour))
                    {
                        newNO.GetComponent<NetworkBehaviour>().CopyStateFrom(myCustomNetworkBehaviour);
                    }
                });
            }
        }
    }
}


/// <summary>
/// Example definition of an INetworkStruct.
/// </summary>
public struct NetworkInputPrototype : INetworkInput
{

    public const int BUTTON_USE = 0;
    public const int BUTTON_FIRE = 1;
    public const int BUTTON_FIRE_ALT = 2;

    public const int BUTTON_FORWARD = 3;
    public const int BUTTON_BACKWARD = 4;
    public const int BUTTON_LEFT = 5;
    public const int BUTTON_RIGHT = 6;

    public const int BUTTON_JUMP = 7;
    public const int BUTTON_CROUCH = 8;
    public const int BUTTON_WALK = 9;

    public const int BUTTON_ACTION1 = 10;
    public const int BUTTON_ACTION2 = 11;
    public const int BUTTON_ACTION3 = 12;
    public const int BUTTON_ACTION4 = 14;

    public const int BUTTON_RELOAD = 15;

    public NetworkButtons Buttons;
    public byte Weapon;
    public Angle Yaw;
    public Angle Pitch;

    public bool IsUp(int button)
    {
        return Buttons.IsSet(button) == false;
    }

    public bool IsDown(int button)
    {
        return Buttons.IsSet(button);
    }
}