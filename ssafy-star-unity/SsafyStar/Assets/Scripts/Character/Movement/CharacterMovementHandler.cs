using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class CharacterMovementHandler : NetworkBehaviour
{
    NetworkCharacterControllerPrototypeCustom networkCharacterControllerPrototypeCustom;

    private void Awake()
    {
        networkCharacterControllerPrototypeCustom = GetComponent<NetworkCharacterControllerPrototypeCustom>();
    }

    private void Start()
    {
        
    }

    //로컬 업데이트
    private void Update()
    {
        
    }

    //네트워크 업데이트
    public override void FixedUpdateNetwork()
    {
        // 네트워크로부터 입력 값 가져옴
        if (GetInput(out NetworkInputData networkInputData))
        {
            //Vector3 moveDirection = transform.forward * networkInputData.movementInput.y + transform.right * networkInputData.movementInput.x;
            Vector3 moveDirection = new Vector3(networkInputData.movementInput.y, 0f, networkInputData.movementInput.x).normalized;
            moveDirection.Normalize();

            networkCharacterControllerPrototypeCustom.Move(moveDirection);
        }
    }
}
