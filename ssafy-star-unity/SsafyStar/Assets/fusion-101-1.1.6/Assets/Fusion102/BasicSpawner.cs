using System;
using System.Collections.Generic;
using Fusion;
using Fusion.Sockets;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace Fusion102
{
	public class BasicSpawner : MonoBehaviour, INetworkRunnerCallbacks 
	{
		private NetworkRunner _runner;
		private bool _mouseButton0;
        
		private void Update()
        {
			_mouseButton0 = _mouseButton0 | Input.GetMouseButton(0);
        }

        [SerializeField] private NetworkPrefabRef _playerPrefab; // Character to spawn for a joining player
		private Dictionary<PlayerRef, NetworkObject> _spawnedCharacters = new Dictionary<PlayerRef, NetworkObject>();

		private void OnGUI()
		{
			if (_runner == null)
			{
				//사용자가 게임을 호스팅 할 것인지 아니면 기존 세션에 참여할 것인지를 선택
				if (GUI.Button(new Rect(0,0,200,40), "Host"))
				{
					StartGame(GameMode.Host);
				}
				if (GUI.Button(new Rect(0,40,200,40), "Join"))
				{
					StartGame(GameMode.Client);
				}
			}
		}

		async void StartGame(GameMode mode)
		{
			// Create the Fusion runner and let it know that we will be providing user input
			//input 제공
			_runner = gameObject.AddComponent<NetworkRunner>();
			_runner.ProvideInput = true;

			// Start or join (depends on gamemode) a session with a specific name
			//게임 방 정보 생성
			await _runner.StartGame(new StartGameArgs()
			{
				GameMode = mode, 
				SessionName = "TestRoom", 
				Scene = SceneManager.GetActiveScene().buildIndex,
				//씬에 직접 배치된 NetworkObject의 인스턴스화 처리
				SceneManager = gameObject.AddComponent<NetworkSceneManagerDefault>()
			});
		}

		//플레이어가 연결할 때, OnPlayerJoined 메소드가 호출
		public void OnPlayerJoined(NetworkRunner runner, PlayerRef player)
		{
			if (runner.IsServer)
			{
				Vector3 spawnPosition = new Vector3((player.RawEncoded%runner.Config.Simulation.DefaultPlayers)*3,1,0);
				//유니티의 Instantiate() 메소드를 마지막 매개 변수를 제외하고 유사한 매개 변수 집합을 사용하는 runner.Spawn
				NetworkObject networkPlayerObject = runner.Spawn(_playerPrefab, spawnPosition, Quaternion.identity, player);
				_spawnedCharacters.Add(player, networkPlayerObject);
			}
		}

		//플레이어가 연결 해제할 때, OnPlayerLeft 메소드가 호출
		public void OnPlayerLeft(NetworkRunner runner, PlayerRef player)
		{
			if (_spawnedCharacters.TryGetValue(player, out NetworkObject networkObject))
			{
				runner.Despawn(networkObject);
				_spawnedCharacters.Remove(player);
			}
		}

		//OnInput 콜백에서 Fusion에 의해 폴링 될 때 클라이언트는 사용자로부터 입력을 수집해야 한다.
		public void OnInput(NetworkRunner runner, NetworkInput input)
		{
			var data = new NetworkInputData();

			if (Input.GetKey(KeyCode.W))
				data.direction += Vector3.forward;

			if (Input.GetKey(KeyCode.S))
				data.direction += Vector3.back;

			if (Input.GetKey(KeyCode.A))
				data.direction += Vector3.left;

			if (Input.GetKey(KeyCode.D))
				data.direction += Vector3.right;

            if (_mouseButton0)
                data.buttons |= NetworkInputData.MOUSEBUTTON1;
            _mouseButton0 = false;

            input.Set(data);
		}
		
		public void OnInputMissing(NetworkRunner runner, PlayerRef player, NetworkInput input) { }
		public void OnShutdown(NetworkRunner runner, ShutdownReason shutdownReason) { }
		public void OnConnectedToServer(NetworkRunner runner) { }
		public void OnDisconnectedFromServer(NetworkRunner runner) { }
		public void OnConnectRequest(NetworkRunner runner, NetworkRunnerCallbackArgs.ConnectRequest request, byte[] token) { }
		public void OnConnectFailed(NetworkRunner runner, NetAddress remoteAddress, NetConnectFailedReason reason) { }
		public void OnUserSimulationMessage(NetworkRunner runner, SimulationMessagePtr message) { }
		public void OnSessionListUpdated(NetworkRunner runner, List<SessionInfo> sessionList) { }
		public void OnCustomAuthenticationResponse(NetworkRunner runner, Dictionary<string, object> data) { }
		public void OnHostMigration(NetworkRunner runner, HostMigrationToken hostMigrationToken) { }
		public void OnReliableDataReceived(NetworkRunner runner, PlayerRef player, ArraySegment<byte> data) { }
		public void OnSceneLoadDone(NetworkRunner runner) { }
		public void OnSceneLoadStart(NetworkRunner runner) { }
	}
}
