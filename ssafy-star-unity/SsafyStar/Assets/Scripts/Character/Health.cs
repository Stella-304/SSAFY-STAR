using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class Health : NetworkBehaviour
{
    [Networked(OnChanged = nameof(NetworkedHealthChanged))]
    public float NetworkedHealth { get; set; } = 100;

    [Rpc(RpcSources.All, RpcTargets.StateAuthority)]
    public void DealDamageRpc(float damage)
    {
        // The code inside here will run on the client which owns this object (has state and input authority).
        //Debug.Log("Received DealDamageRpc on StateAuthority, modifying Networked variable");
        NetworkedHealth -= damage;
    }

    private static void NetworkedHealthChanged(Changed<Health> changed)
    {
        // Here you would add code to update the player's healthbar.
        //Debug.Log($"Health changed to: {changed.Behaviour.NetworkedHealth}");
    }
}
