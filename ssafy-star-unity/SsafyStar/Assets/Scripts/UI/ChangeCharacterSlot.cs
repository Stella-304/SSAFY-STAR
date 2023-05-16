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
        Debug.Log("클릭했다"+CharacterNum);

        playerData.player.GetComponent<ChangeCharacter>().RPCDoChange(CharacterNum);
        panel.SetActive(false);
    }
}
