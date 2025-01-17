import { IdStore, Network, WebAuthnIdentity } from "@liftedinit/many-js";
import { NeighborhoodContext } from "api/neighborhoods";
import { useContext } from "react";
import { useMutation } from "react-query";

export function useSaveWebauthnCredential() {
  const network = useContext(NeighborhoodContext);
  return useMutation<
    { phrase: string },
    Error,
    {
      address: string;
      credentialId: ArrayBuffer;
      cosePublicKey: ArrayBuffer;
      identity: WebAuthnIdentity;
    }
  >(async ({ address, credentialId, cosePublicKey, identity }) => {
    const n = new Network(network?.url ?? "", identity);
    n.apply([IdStore]);
    const res = await n?.idStore.store(address, credentialId, cosePublicKey);
    return res;
  });
}
