using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class ChangeCharacterSlot : MonoBehaviour
{
    public int CharacterNum;

    public void SelectCharacter()
    {
        Debug.Log("클릭했다"+CharacterNum);
    }
}
