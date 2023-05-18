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

public class ChangeCharacter : NetworkBehaviour
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
    public GameObject nickname;

    [Rpc(RpcSources.All, RpcTargets.All)]
    public void RPCDoChange(int playerNum, RpcInfo info = default)
    {
        Transform transform = characterList[playerNum].model.transform;
        Animator anim = characterList[playerNum].anim;

        playerMovement.interpolationPos = transform;
        characterControllerPrototype.InterpolationTarget = transform;
        networkMecanimAnimator.Animator = anim;

        characterList[beforeCharacterNum].model.SetActive(false);
        characterList[playerNum].model.SetActive(true);
        nickname.transform.parent = characterList[playerNum].model.transform;

        beforeCharacterNum = playerNum;

        if (HasInputAuthority)
        {
            Camera.main.GetComponent<CameraMovement>().Target = characterList[playerNum].model.transform;
        }
    }

}
