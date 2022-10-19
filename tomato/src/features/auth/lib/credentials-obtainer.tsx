import {viewerModel} from "@entities/viewer";
import {request} from "@shared/lib/request";
import {useDispatch} from "@shared/lib/store";
import * as React from "react";
import {authModel} from "..";

export interface CredentialsObtainerProps {
  children: React.ReactNode;
}

export const CredentialsObtainer: React.FC<CredentialsObtainerProps> = ({
  children,
}) => {
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(authModel.actions.fetchCredentials())
      .unwrap()
      .then((res) => {
        dispatch(
          viewerModel.actions.setCredentials({
            credentials: res.credentials,
            type: res.type,
          }),
        );

        dispatch(viewerModel.actions.setViewerType({type: res.type}));

        if (res.type === "volunteer") {
          request({method: "GET", url: "/organisations/invitations"}).then(
            (res) => {
              window["invites"] = res.data.invitations;
            },
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return null;

  return <>{children}</>;
};
