using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;

public class RaycastAttack : NetworkBehaviour
{
    public float Damage;

    public PlayerMovement PlayerMovement;

    void Update()
    {
        if (HasStateAuthority == false)
        {
            return;
        }

        Ray ray = PlayerMovement.Camera.ScreenPointToRay(Input.mousePosition);
        ray.origin += PlayerMovement.Camera.transform.forward;

        if (Input.GetKeyDown(KeyCode.Mouse1))
        {
            Debug.DrawRay(ray.origin, ray.direction, Color.red, 1f);

            if (Runner.GetPhysicsScene().Raycast(ray.origin, ray.direction, out var hit))
            {
                if (hit.transform.TryGetComponent<Health>(out var health))
                {
                    health.DealDamageRpc(Damage);
                }
            }
        }
    }
}
