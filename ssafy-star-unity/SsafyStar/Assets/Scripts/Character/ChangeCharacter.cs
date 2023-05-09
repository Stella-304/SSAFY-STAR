using Fusion;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[System.Serializable]
public class Character
{
    public Animator anim;
    public GameObject model;
}

public class ChangeCharacter : MonoBehaviour
{
    [SerializeField]
    private PlayerMovement playerMovement;
    [SerializeField]
    private NetworkCharacterControllerPrototype characterControllerPrototype;
    [SerializeField]
    private NetworkMecanimAnimator networkMecanimAnimator;
    [SerializeField]
    private List<Character> characterList;
    private int beforeCharacterNum = 0;


    public int testChangeNum = 2;

    private void Update()
    {
        if(Input.GetKeyDown(KeyCode.C))
        {
            if (characterList.Count <= 0) return;
            DoChange(testChangeNum);
        }
    }

    public void DoChange(int playerNum)
    {
        Debug.Log(characterList[playerNum].model.name);
        Transform transform = characterList[playerNum].model.transform;
        Animator anim = characterList[playerNum].anim;

        playerMovement.interpolationPos = transform;
        characterControllerPrototype.InterpolationTarget = transform;
        networkMecanimAnimator.Animator = anim;

        characterList[beforeCharacterNum].model.SetActive(false);
        characterList[playerNum].model.SetActive(true);

        Camera.main.GetComponent<CameraMovement>().Target = characterList[playerNum].model.transform;
        beforeCharacterNum = playerNum;

    }
}
