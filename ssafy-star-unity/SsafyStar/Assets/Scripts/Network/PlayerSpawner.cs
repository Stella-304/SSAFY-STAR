using Fusion;
using UnityEngine;
using UnityEngine.UIElements;

public class PlayerSpawner : SimulationBehaviour, IPlayerJoined
{
    public GameObject PlayerPrefab;
    public Transform SpawnPos;

    public GameObject loadingUI;
    public PlayerData playerData;

    public void PlayerJoined(PlayerRef player)
    {
        if (player == Runner.LocalPlayer)
        {
            loadingUI.SetActive(false);
            GameObject goPlayer = Runner.Spawn(PlayerPrefab, SpawnPos.position, Quaternion.identity, player).gameObject;
            playerData.NickName = PlayerPrefs.GetString("Nickname");
            playerData.player = goPlayer;
            goPlayer.gameObject.name = "Player_"+ PlayerPrefs.GetString("Nickname");
        }
    }

}