using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class ChangeCharacterSlot : MonoBehaviour
{
    public int CharacterNum;
    [SerializeField]
    private PlayerData playerData;
    [SerializeField]
    private LobbyUIController UIController;

    private void Start()
    {
        UIController = GameObject.Find("UIMenu").GetComponent<LobbyUIController>();
    }

    public void SelectCharacter()
    {
        playerData.player.GetComponent<ChangeCharacter>().RPCDoChange(CharacterNum);
        UIController.CloseDictionary();
    }
}
