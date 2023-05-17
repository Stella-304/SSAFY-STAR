using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class ChangeCharacterSlot : MonoBehaviour
{
    public int CharacterNum;
    [SerializeField]
    private GameObject panel;
    [SerializeField]
    private PlayerData playerData;

    public void SelectCharacter()
    {
        playerData.player.GetComponent<ChangeCharacter>().RPCDoChange(CharacterNum);
        panel.SetActive(false);
    }
}
