using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Fusion;
using UnityEngine.UI;

public class EmotionAnimation : MonoBehaviour
{
    [Header("Anim")]
    [SerializeField]
    public NetworkMecanimAnimator networkAnimator;

    public void SetAnimation(string Anim)
    {
        networkAnimator.Animator.SetBool(Anim, true);
    }

}
