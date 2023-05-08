using Fusion;
using UnityEngine;
using UnityEngine.UIElements;

public class PlayerSpawner : SimulationBehaviour, IPlayerJoined
{
    public GameObject PlayerPrefab;
    public Transform SpawnPos;

    public GameObject loadingUI;

    public void PlayerJoined(PlayerRef player)
    {
        if (player == Runner.LocalPlayer)
        {

            loadingUI.SetActive(false);

            Runner.Spawn(PlayerPrefab, SpawnPos.position, Quaternion.identity, player);
        }
    }

}