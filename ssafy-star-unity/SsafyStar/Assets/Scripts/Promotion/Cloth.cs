using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cloth : MonoBehaviour
{

    [SerializeField]
    private LobbyUIController lobbyUI;

    private void OnMouseUpAsButton()
    {
        lobbyUI.OpenDictionary();
    }
}
