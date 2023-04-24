using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class NetworkPlayer : NetworkBehaviour, IPlayerLeft
{
    public static NetworkPlayer Local { get; set; }

    private void Start()
    {
        
    }

    //플레이어가 스폰됬을때 실행되는 함수
    public override void Spawned()
    {
        //컨트롤 할 수 있는 오브젝트라면(로컬 플레이어라면)
        if(Object.HasInputAuthority)
        {
            Local = this;

            Debug.Log("로컬 플레이어 스폰");
        }
        else
        {
            Debug.Log("리모트 플레이어 스폰"); 
        }
    }

    public void PlayerLeft(PlayerRef player)
    {
        //로컬 플레이어라면
        if(player == Object.InputAuthority)
        {
            //스폰해제 하기
            Runner.Despawn(Object);
        }
    }
}
